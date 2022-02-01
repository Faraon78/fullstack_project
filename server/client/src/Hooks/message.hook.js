import { useCallback } from "react";
//import Alert from '@mui/material/Alert';

export const useMessage = () => {
    return useCallback((message) => {
        if (message){
            console.log("заработал хук useMessage")
        //<Alert onClose={() => {}} severity="error" className="errorAlert">This is a success alert — check it out!</Alert>
        }
    },[])
}