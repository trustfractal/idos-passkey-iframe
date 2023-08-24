const base64ToArrayBuffer = (base64) => (
  Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer
);

const arrayBufferToBase64 = (bytes) => (
  btoa(String.fromCharCode(...new Uint8Array(bytes)))
);

const main = async () => {
  document.querySelector("#passkey").innerText = "checking if one exists...";

  const challenge = crypto.getRandomValues(new Uint8Array(10));

  const credentialId = window.localStorage.getItem("idos-credential-id");

  try {
    let publicKey = {
      challenge: challenge,
      //rpId: "idos.network",
    }

    if (credentialId !== null) {
      publicKey.allowCredentials = [{
        id: base64ToArrayBuffer(credentialId),
        type: "public-key",
      }];
    }

    let credential = await navigator.credentials.get({ publicKey });

    if (credential !== null) {
      document.querySelector("#passkey").innerText = "already exists";
      return;
    }
  } catch (e) {
    // user cancelled passkey lookup; let's create one
  }

  document.querySelector("#passkey").innerText = "creating...";

  const password = window.prompt("IDOS password");

  if (password === null) {
    document.querySelector("#passkey").innerText = "user cancelled prompt";
    return;
  }

  try {
    publicKey = {
      challenge: challenge,
      rp: {
        // id: "idos.network",
        name: "IDOS",
      },
      user: {
        id: new TextEncoder().encode(password),
        name: "idos user",
        displayName: "idos user"
      },
      pubKeyCredParams: [ {type: "public-key", alg: -7} ]
    };

    credential = await navigator.credentials.create({ publicKey });

    window.localStorage.setItem("idos-credential-id", arrayBufferToBase64(credential.rawId));

    document.querySelector("#passkey").innerText = "created";
  } catch (e) {
    document.querySelector("#passkey").innerText = "user cancelled creation";
  }
};

document.querySelector("button").addEventListener("click", main);
