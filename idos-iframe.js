const dappUrl = new URL(document.referrer).origin;
let password;

const deriveKey = (password, humanId) => {
  // stub: key derivation with salt

  return `deriveKey("${password}", "${humanId}")`;
};

const decrypt = (key, message) => {
  // stub: decryption with derived key

  return "some decrypted data";
};

window.addEventListener("message", (event) => {
  if (event.origin != dappUrl) { return; }

  const { humanId, encryptedData } = event.data;

  const key = deriveKey(password, humanId);
  const decryptedData = decrypt(key, encryptedData);

  document.querySelector("#decryption-request").innerText = encryptedData;
  document.querySelector("#key").innerText = key;

  window.parent.postMessage({ decryptedData: decryptedData }, dappUrl);
});

(async () => {
  const publicKey = {
    challenge: crypto.getRandomValues(new Uint8Array(10)),
    //rpId: "idos.network",
  };

  const credential = await navigator.credentials.get({ publicKey });
  password = new TextDecoder().decode(credential.response.userHandle);

  document.querySelector("#password").innerText = password;
})();
