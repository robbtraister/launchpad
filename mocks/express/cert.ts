// @ts-ignore
import selfsigned from "selfsigned";

export function createCertificate() {
  return selfsigned.generate([{ name: "commonName", value: "localhost" }], {
    algorithm: "sha256",
    days: 30,
    keySize: 2048,
    extensions: [
      // {
      //   name: 'basicConstraints',
      //   cA: true,
      // },
      {
        name: "keyUsage",
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true,
      },
      {
        name: "extKeyUsage",
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        timeStamping: true,
      },
      {
        name: "subjectAltName",
        altNames: [
          {
            // type 2 is DNS
            type: 2,
            value: "localhost",
          },
          {
            type: 2,
            value: "[::1]",
          },
          {
            // type 7 is IP
            type: 7,
            ip: "127.0.0.1",
          },
          {
            type: 7,
            ip: "0.0.0.0",
          },
          {
            type: 7,
            ip: "fe80::1",
          },
        ],
      },
    ],
  });
}
