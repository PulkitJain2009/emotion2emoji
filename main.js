prediction_1="";
prediction_2="";

camera=document.getElementById("camera");
Webcam.set({
    widht:300,
 height:300,
 image_format:'jpeg',
 jpeg_quality:90
});

Webcam.attach('#camera');
function  take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById ("result").innerHTML='<img id="selfie_image"src= "'+data_uri+'">';
    });

}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uEJ0dLS-G/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function speak (){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="The second prediction is "+prediction_2;
var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterthis);
};
function check(){
    img=document.getElementById ('selfie_image');
    classifier.classify(img,gotResult);

}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#x1F607;";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#x1F612;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#x1F624;";
        }
        
        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#x1F607;";
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#x1F612;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#x1F624;";
        }
    }
}