import React from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

const GenerateQR = ({user}) => {

  let qr = user.fname+user.lname+user.birthday+user.id;

  const saveQR = () => {
    html2canvas(document.getElementById("qr_code")).then(function (canvas) {                   
      var anchorTag = document.createElement("a");
       document.body.appendChild(anchorTag);
       anchorTag.download = `${user.fname}_${user.lname}.jpg`;
       anchorTag.href = canvas.toDataURL();
       anchorTag.target = '_blank';
       anchorTag.click();
   });
  }

  return(
    <div className="flex flex-col flex-1 p-8">
      <div className='flex justify-between w-full'>
        <h1 className="text-xl font-bold mb-6">QR Code</h1>
      </div>
      <div className='flex flex-col items-center bg-white rounded-lg py-20'>
        <div id="qr_code" className="flex items-center justify-center p-4">
          <QRCode value={qr} />
        </div>

        <Button 
          type="submit"
          className="bg-blue-600 text-white font-semibold mt-16"
          onClick={saveQR}
        >
          DOWNLOAD QR CODE
        </Button>
      </div>
    </div>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
  border-radius: 0.25rem;
  border: 1px solid #E1DFEC;
  border-radius: 2rem;
  height: 3rem;
`;

export default GenerateQR;