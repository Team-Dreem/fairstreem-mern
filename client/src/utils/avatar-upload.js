//Bucket Configurations
var bucketName = 'fairstreem';
var bucketRegion = 'us-east-2';
var IdentityPoolId = 'us-east-2:91d5b882-7c85-4c6a-a2ac-a786c400389d';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: bucketName
    }
});

const expressUpload = async (e) => {

    var form = document.getElementById("fileUpload");
    var formData = new FormData(form);
    console.log("expressUpload", formData)
    const response = await fetch(`/api/users/avatar`, {
        method: 'POST',
        body: formData
    });
    window.location.reload()
}

(() => {
    document.getElementById('fileSelector').onchange = expressUpload;
})();