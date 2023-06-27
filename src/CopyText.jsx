import React from 'react'

const CopyText = ({ note }) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(note);
        showNotification();
    };

    const showNotification = () => {
        window.alert("copied")
    };


    return (
        <div>
            <button 
            onClick={copyToClipboard}
            disabled={!note}
            className='px-4 py-2 bg-yellow-500 font-semibold' 
            >copy text</button>
        </div>
    )
}

export default CopyText;