import React, { useState, useEffect } from 'react';

const JsonDisplay = ({ jsonResponse }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dataFormatter = (data) => {
        if (data === null || data === undefined || data === "Information is not available on the PDF") {
            return "N/A";
        } else if (typeof data === 'object') {
            return JSON.stringify(data, null, 2);
        } else {
            return data.toString();
        }
    }

    const renderContent = () => {
        // Check if the JSON is empty for formatting
        if (!jsonResponse) {
            return <p>No data yet...</p>;
        }

        //Raw Code if failing the JSON format.
        if (jsonResponse.error && jsonResponse.raw_content) {
            return (
                <div>
                    <p>Error: {jsonResponse.error}</p>
                    {/*Display raw content for debugging purposes and fallback, with correct formating for code  */}
                    <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>{jsonResponse.raw_content}</pre>
                </div>
            );
        }

        //Code for "Extract text"
        if (jsonResponse.pages) {
            try{
                const pages = JSON.parse(jsonResponse.pages)
                 return (
                     <div>
                      {/*Code if is working correctly! This is the RAW content with JSON Formatter now with more code (3 steps for all tests) !*/}
                         <p>Formatted JSON: check those  test  and test or what you want {dataFormatter(jsonResponse)}</p>
                        {/*It Works!!! For data and for everything! You can have this here!*/}
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{jsonResponse.pages} </pre>
                     </div>
                 );
             } catch (e){
              return(
                <div>
                  <p>Error: JSON code for text extract had a problem on line 370, see below</p>
                   <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>Error can't format: Check the variable since we can't use it anymore! This is usually a bug for a missing code of formatting or not formatting that part to the right thing: {jsonResponse.pages} </pre>
                </div>
              );
           }
        }

       //This data format the best of all possible ways
         //Code for "Extract "
        if (jsonResponse.Data) {
           return (
              <div>
                   <p>
                       {dataFormatter(jsonResponse.Data)}
                   </p>
                </div>
           );
       }

         else {
            return <p>I can't work and see if that's all! If not, you might send me incorrect, contact staff";</p>;
        }
    };

    return (
        <div
            style={{
                position:"absolute",
                padding: "16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                maxHeight: "400px",
                overflow: "auto",
                fontSize: isMobile ? "12px" : "14px",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                width: "43%",
                boxSizing: "border-box",
            }}
        >
            {renderContent()}
        </div>
    );
};

export default JsonDisplay;