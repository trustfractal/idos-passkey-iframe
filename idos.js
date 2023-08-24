const main = async () => {
  document.querySelector("#passkey").innerText = "checking if one exists...";

  // I don't think there's a way to know if credentials exist
  // without triggering a browser dialog; this could be confusing
  try {
    let publicKey = {
      challenge: crypto.getRandomValues(new Uint8Array(10)),
      //rpId: "idos.network",
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
      challenge: crypto.getRandomValues(new Uint8Array(10)),
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

    document.querySelector("#passkey").innerText = "created";
  } catch (e) {
    document.querySelector("#passkey").innerText = "user cancelled creation";
  }
};

document.querySelector("button").addEventListener("click", main);
