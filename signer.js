const crypto = require("crypto");

function encodeRfc3986(urlEncodedString) {
  // assuming string has already been percent encoded
  return urlEncodedString.replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeRfc3986Full(str) {
  return encodeRfc3986(encodeURIComponent(str));
}

const canonicalize_uri = (uri) => {
  var url_parts = new URL(uri);

  let pathStr = url_parts.pathname;
  if (/[^0-9A-Za-z;,/?:@&=+$\-_.!~*'()#%]/.test(pathStr)) {
    pathStr = encodeURI(decodeURI(pathStr));
  }
  if (pathStr === "/") {
    return pathStr;
  }

  pathStr = pathStr.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  pathStr = pathStr
    .split("/")
    .reduce(function (path, piece) {
      piece = decodeURIComponent(piece.replace(/\+/g, " "));
      path.push(encodeRfc3986Full(piece));
      return path;
    }, [])
    .join("/");

  if (pathStr[0] !== "/") pathStr = "/" + pathStr;
  // decode slashes in path
  pathStr = pathStr.replace(/%2F/g, "/");

  return pathStr;
};

const canonicalize_headers = (headers, signed_headers) => {
  return Object.values(signed_headers)
    .sort(function (a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    })
    .map(function (key) {
      if (!(key in headers)) {
        throw new Error("missing required header=" + key);
      }
      return `${key.toLowerCase()}:${headers[key].toString().trim().replace(/\s+/g, " ")}`;
    })
    .join("\n");
};

const canonicalize_query_string = (params) => {
  // let sorted_qs = [];
  // for (const key in params) {
  //   var val = params[key];
  //   if (Array.isArray(val)) val = val.sort();
  //   var encoded_input = encodeURIComponent(val);
  //   // var encoded_input = encodeURIComponent(val).replace(/%20/g, "+");
  //   sorted_qs.push(`${key}=${encoded_input}`);
  // }
  // sorted_qs = sorted_qs.sort().join("&");

  var reducedQuery = Object.keys(params).reduce(function (obj, key) {
    if (!key) return obj;
    obj[encodeRfc3986Full(key)] = params[key];
    return obj;
  }, {});
  var encodedQueryPieces = [];
  Object.keys(reducedQuery)
    .sort()
    .forEach(function (key) {
      if (!Array.isArray(reducedQuery[key])) {
        encodedQueryPieces.push(
          key + "=" + encodeRfc3986Full(reducedQuery[key])
        );
        return;
      }
      reducedQuery[key]
        .map(encodeRfc3986Full)
        .sort()
        .forEach(function (val) {
          encodedQueryPieces.push(key + "=" + val);
        });
    });
  const queryStr = encodedQueryPieces.join("&");

  const qs = queryStr.replace(/\+/g, "%20");
  return qs;
};
const req_payload_hash = (body) => {
  if (body === null || typeof body === "undefined") return "";

  let body_text = JSON.stringify(body);
  // const body_text = body.toString();

  const formDataToJson = function (f) {
    return Object.fromEntries(
      Array.from(f.keys(), (k) => {
        console.log(typeof f.get(k));
        return k.endsWith("[]") ? [k.slice(0, -2), f.getAll(k)] : [k, f.get(k)];
      })
    );
  };

  // if (body instanceof FormData) {
  //   return "";
  // }

  const digest = crypto.createHash("sha256").update(body_text).digest("hex");
  return digest;
};

const _sign = (ts, msg, secretKey) => {
  const key = crypto
    .createHmac("sha256", secretKey)
    .update(`${msg.length}${ts}`)
    .digest();

  return crypto.createHmac("sha256", key).update(msg).digest("base64url");
};

const sign = (
  { url, method, params, data: body = null, headers },
  key,
  signed_headers,
  api_endpoint,
  skipBodyHash = false
) => {
  secretKey = Buffer.from(key, "base64");
  if (!url.startsWith("http://") || !url.startsWith("https://")) {
    url = api_endpoint + url;
  }

  const req_method = method.toUpperCase();

  const req_uri = canonicalize_uri(url);
  const qs = canonicalize_query_string(params);
  const hs = canonicalize_headers(headers, signed_headers);
  let body_hash = "";
  if (!skipBodyHash) {
    body_hash = req_payload_hash(body);
  }

  const canonicalizedRequest = [req_method, req_uri, qs, hs, body_hash].join(
    "\n"
  );

  const canonicalizedRequest_hash = crypto
    .createHash("sha256")
    .update(canonicalizedRequest)
    .digest("hex");

  const timestamp = headers["x-date"];
  const data = ["HMAC-SHA256", timestamp, canonicalizedRequest_hash].join("\n");

  const signature = _sign(timestamp, data, secretKey);
  return signature;
};

module.exports = { sign: sign };
