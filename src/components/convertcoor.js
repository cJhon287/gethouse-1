import React from 'react'

const convertcoor = () => {
        const data = JSON.stringify(false);
        
    const xhr = new XMLHttpRequest();
        
    xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
            }
        });
        
    xhr.open("GET", "https://www.onemap.gov.sg/api/common/convert/3414to4326?X=28983.788791079794&Y=33554.5098132845");
        
    xhr.setRequestHeader("Authorization", "**********************");
        
    xhr.send(data);
  return (
    <div>convertcoor</div>
  )
}

export default convertcoor