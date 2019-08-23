# Faqe app 

![](https://raw.githubusercontent.com/alexZajac/faqe/master/public/demo.gif)

## Description
Faqe is a face recognition client, built with [React](https://reactjs.org/). To try the application, the first step is to take a reference image of your face on the reference Tab. Then head up to the Recogntion Tab to perform recognition. You can set a recogntion threshold, which will figure how strict should the system be.

## Credits
Status icons on the Recogntion Tab provided by [Vitaly Gorbachev](https://www.flaticon.com/authors/vitaly-gorbachev) on [Flaticon](https://www.flaticon.com). Icons used for Tabs are from [Good Ware](https://www.flaticon.com/authors/good-ware), [Chris Veigt](https://www.flaticon.com/authors/chris-veigt) and [Freepik](https://www.flaticon.com/authors/freepik) also from Flaticon.
- For face detection, this project implements a SSD (Single Shot Multibox Detector) based on MobileNetV1, trained on the [WIDERFACE dataset](http://mmlab.ie.cuhk.edu.hk/projects/WIDERFace/) and the weights are provided by [yeephycho](https://github.com/yeephycho) in [this](https://github.com/yeephycho/tensorflow-face-detection) repo. This API and the next are both provided by [this project](https://github.com/justadudewhohacks/face-api.js).
- For face recognition, a [ResNet-34](https://neurohive.io/en/popular-networks/resnet/) like architecture is implemented to compute a face descriptor (a feature vector with 128 values) from any given face image, which is used to describe the characteristics of a persons face. The weights have been trained by [davisking](https://github.com/davisking) and the model achieves a prediction accuracy of 99.38% on the [LFW](http://vis-www.cs.umass.edu/lfw/) (Labeled Faces in the Wild) benchmark for face recognition.

## Privacy
Faqe is a client software, and was only created for an educational purposes. The reference image taken by the app is not being sent to a server or to a database for processing or other uses, and only a 128-dimensionnal space [embedding](https://en.wikipedia.org/wiki/Embedding) (representation) of your face is stored on your local machine for face recognition. The face recognition systems works the same way, all on your computer, and make sure to [contact me](https://en.wikipedia.org/wiki/Embedding) if there are any questions on the app.