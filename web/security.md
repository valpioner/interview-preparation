# Security

## Authentication

Authentication verifies who you are and if you are who you claim to be.

### OpenID Connect (OIDC)

OpenID Connect is an authentication layer on top of OAuth 2.0. It allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user in an interoperable and REST-like manner.

OIDC uses ID tokens.

### Passport.js

Passport.js is an authentication middleware for Node.js. It is flexible and modular, allowing you to use different strategies for authentication. It supports authentication using a username and password, Facebook, Google, Twitter, and more.

## Authorization

Authorization verifies what you are authorized to do.

### OAuth 2.0

OAuth 2.0 is an authorization framework for REST/APIs. It enables apps to obtain limited access (scopes) to user's data/account (Facebook, GitHub etc.) without giving away a user’s password. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account.

OAuth 2.0 uses Access tokens and Refresh tokens.

OAuth 2.0 defines four roles:

- client (consumer)
- authorization server,
- resource server (service provider),
- resource owner (user)

General flow:

- App requests authorization from User
- User authorizes App and delivers proof
- App presents proof of authorization to server to get a Token
- Token is restricted to only access what the User authorized for the specific App

## Auth0

Auth0 is a cloud platform that provides authentication and authorization as a service. It allows developers to add authentication to their applications with just a few lines of code.

## Same-origin policy (SOP) & Cross-origin resource sharing (CORS)

- SOP: Enforced by browsers to restrict cross-origin interactions.
- Server's Role: Servers can use CORS headers to relax SOP restrictions and allow controlled cross-origin access.

### Same-origin policy (SOP)

- The `Same-origin policy (SOP)` is a restrictive security measure in Browsers that restricts how documents or scripts loaded from one origin can interact with resources from another origin. By default, browsers block cross-origin requests that violate SOP.

Two URLs have the same origin if they share the same scheme, host, and port

### Cross-origin resource sharing (CORS)

- `Cross-origin resource sharing (CORS)` is a mechanism that allows web servers to specify who can access their resources and how using HTTP headers to relax SOP restrictions and allow cross-origin requests.

HTTP response headers might tell browsers to give a web application running at one origin, access to selected resources from a different origin.

Preflight request is an extra request that is made to the server before the actual request. It is used to check if the actual request is safe to send.

- `Access-Control-Allow-Origin`: Specifies which origins are allowed to access the resource.
- `Access-Control-Allow-Methods`: Specifies which HTTP methods are allowed.
- `Access-Control-Allow-Headers`: Specifies which headers can be used in the actual request.

Ways to resolve/bypass CORS errors:

- Use a proxy server
- Use JSONP
- Add CORS response headers to the server
- Browser extensions or flags to disable CORS (for development only)

## Session Management

### Tokens

- `ID` tokens are used to identify the user. They are used to identify the user and contain user information like name, email, and other profile information.

- `Access tokens` are used to access protected resources. They are short-lived tokens that are used to access resources on behalf of a user. Issued by the authorization server. It is a bearer token, meaning that whoever has the token can access the resources.

- `Refresh tokens` are used to obtain new access tokens. They are long-lived tokens that are used to request new access tokens. They are used to maintain a session and are stored in a secure location.

## Cookies Protection

Protect cookie with attributes:

- Domain - restricts the scope of a cookie to a particular domain and its subdomains, it is a security feature to prevent cookies from being read by unauthorized parties.
- Path - restricts the scope to a path and its subpaths
- HttpOnly - instructs the browser that the cookie should not be accessible through JavaScript or other client side scripts, which helps prevent it being stolen by malicious code
- Secure - indicates that the browser should only send the cookie when using HTTPS

## Protect Data in Transit

`HTTP` is not secure. Use `HTTPS` to encrypt data in transit, it is a combination of `HTTP` and `SSL/TLS` protocols. SSL/TLS encrypts data between the client and the server. HTTPS is essential for protecting sensitive information like passwords, credit card numbers, and personal information.

### SSL/TLS

- SSL (Secure Sockets Layer) - older protocol used to secure communication between web browsers and servers.

- TLS (Transport Layer Security) - newer protocol on top of TCP that provides secure communication between web browsers and servers.

Client: Initiates the handshake, proposes security parameters, verifies the server's certificate, and establishes a shared secret. It encrypts the secret with the server's public key and sends it to the server.

Server: Responds to the client's proposals, provides its certificate with a public key and decrypts the client's secret, optionally requests the client's certificate, and establishes a shared secret.

### Public Keys Vs Private Keys

Whatever is encrypted with a public key can only be decrypted with the corresponding private key and vice versa.

Server sends a public key to the client, the client encrypts the shared secret with the public key and sends it back to the server. The server decrypts the shared secret with its private key.

If mutual authentication is required, the client sends its public key to the server, the server encrypts the shared secret with the client's public key and sends it back to the client. The client decrypts the shared secret with its private key.

### Symmetric vs. Asymmetric Encryption

- `Symmetric Encryption` - uses the same key for encryption and decryption. It is faster and used for encrypting large amounts of data.
- `Asymmetric Encryption` - uses a pair of keys (public and private) for encryption and decryption. It is slower and used for encrypting small amounts of data.

### JSON Web Tokens (JWT)

`JSON Web Tokens (JWT)` - a standard for securely transmitting information between parties as a JSON object. It is used to authenticate and authorize users.

This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

JWT mainly used for authorization and information exchange.

It looks like `xxxxx.yyyyy.zzzzz` and consists of:

- Header - contains the type of token and the signing algorithm.
- Payload - contains the claims. Claims are statements about an entity (typically, the user) and additional data.
- Signature - used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

## Hacker Attack Types

- `CSS/XSS (Cross-Site Scripting)` - injects malicious script into web-page attempting to execute that code in the browser to steal information or perform actions on behalf of the user
  - Prevent by input validation, output encoding, and using CSP (Content Security Policy)
- `CSRF/XSRF (Cross-Site Request Forgery)` - attack that tricks the victim into submitting a malicious request exploiting a user/app trust.
  - Prevent by using CSRF tokens, SameSite cookie attribute, and checking the referrer header.
- `SQL Injection` - attack that allows attackers to execute SQL code on a database by injecting malicious SQL code into a query.
  - Prevent by using prepared statements, parameterized queries, and ORM.
- `man in the middle` - attacker secretly intercepts and possibly alters the communication between two parties who believe they are directly communicating with each other (e.g. public Wi-Fi).
  - Prevent by using HTTPS, HSTS (HTTP Strict Transport Security), and certificate pinning.
- `DDoS (Distributed Denial of Service)` - The attacker uses a network of compromised devices (botnet) to flood the target system with a massive amount of traffic, overwhelming its resources and making it unavailable to legitimate users.
  - Prevent by using rate limiting, caching, and DDoS protection services.
- `Brute Force` - method used to gain access to a system by systematically trying all possible combinations of passwords or encryption keys until the correct one is found.
  - Prevent by using strong passwords, multi-factor authentication, and account lockout policies.
