const idosUrl = new URL(document.location.search.split("=")[1]);
const iframe = document.querySelector("iframe");

iframe.src = idosUrl;

window.addEventListener("message", (event) => {
  if (event.origin != idosUrl.origin) { return; }

  document.querySelector("#decryption-response").innerText = event.data.decryptedData;
});

document.querySelector("button").addEventListener("click", (e) => {
  iframe.contentWindow.postMessage(
    {
      humanId: "123",
      encryptedData: "some data to decrypt",
    },
    idosUrl.origin,
  );
});
