
const getdata = ()=>{
    let dada
     fetch('http://worldtimeapi.org/api/timezone/Asia/Yangon').then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
       dada = data
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
    return dada
};

export default getdata;