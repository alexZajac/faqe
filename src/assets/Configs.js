import id from "./icons/face-scanner.png";
import capture from "./icons/photo-camera.png";
import info from "./icons/info.png";
import neutral from "./icons/meh.png";
import error from "./icons/sad.png";
import success from "./icons/smile.png";

const tabConfig = [
  {
    icon: id,
    label: "RECOGNITION"
  },
  {
    icon: capture,
    label: "REFERENCE"
  },
  {
    icon: info,
    label: "INFO"
  }
];

const statusConfig = { neutral, success, error };

const infoConfig = {
  app: {
    title: "Faqe",
    description:
      "Faqe is a face recognition client, built with React. To try the application, the first step is to take a reference image of your face on the reference Tab. Then head up to the Recogntion Tab to perform recognition. You can set a recogntion threshold, which will figure how strict should the system be."
  },
  credits: {
    title: "Credits",
    description: ""
  },
  privacy: {
    title: "Privacy",
    description: ""
  }
};

export { tabConfig, statusConfig, infoConfig };
