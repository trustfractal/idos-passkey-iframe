# idos-passkey-iframe

* `idos` uses WebAuthn to create a passkey
* the user password is stored locally within the passkey
* `dapp` loads `idos-iframe`
* `idos-iframe` uses the passkey to extract the password, for key derivation
* `idos-iframe` exposes an interface via `postMessage` for `dapp` to request data decryption
* `dapp` exposes an interface via `postMessage` for `idos-iframe` to return decrypted data
* **`dapp` never has access to the user password or key**

To test, make sure you're running this in a secure context (`https://`, not `file://`), and:
1. visit `idos.html` to create a passkey
2. visit `dapp.html` to use the passkey and observe the message passing
