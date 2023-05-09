const pigForm = document.querySelector("#pig-form");
let picUrl = "";

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dz815dbbu",
    // make sure we have a preset that allows unsigned uploads! Go to your cloudinary dashboard -> settings -> upload -> upload presets to create a new preset
    uploadPreset: "xokmzqf8",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      // do something with the image url
      picUrl = result.info.url;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function (e) {
    myWidget.open();
  },
  false
);

const submit = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/pigs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.querySelector("#name-input").value,
      pic: picUrl,
    }),
  });
  console.log(response);
};

pigForm.addEventListener("submit", submit);
