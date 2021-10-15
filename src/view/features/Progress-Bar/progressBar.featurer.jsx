import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {JSONdata} from '../../../env/environment'
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '400px', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};
export default function LinearWithValueLabel({isComplated}) {
    const didMount = React.useRef(false);
    const [progress, setProgress] = React.useState(0); // start Value
    const [jsonData, setJsonData]  = React.useState(null) // full json data
    const [timerInterval, setTimerInterval] = React.useState(null) // interval animation 
    // Featch Data From Json File  
    React.useEffect( () => {
        JSONdata.get().then(res => {
            // set Data
            setJsonData(res.data.data.lightbox)
            // set Start Value
            setProgress(res.data.data.lightbox.start)
        })

    }, [])
    React.useEffect(()=>{
        if (didMount.current){
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= !jsonData?.finish &&  prevProgress + 10));
            }, jsonData?.duration / 10);
            setTimerInterval(timer)
            return ()=>{
                clearInterval(timer)
            }
        }else{
            didMount.current = true;
        }
    }, [jsonData])
    // Progress bar is 100% completed
    React.useEffect(()=>{
        if (didMount.current) {
            if (progress >= 100){
                clearInterval(timerInterval)
                isComplated(true)
            }
        }else{
            didMount.current = true;
        }
    }, [progress])
    // On Distroy 
    React.useEffect(()=>{
        return ()=>{
            didMount.current = false;
            clearInterval(timerInterval);
            setProgress(0)
            setJsonData(null)
            setTimerInterval(null)
            isComplated(false)
        }
    },[])
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel color={`${progress == 100 ? 'success' : 'primary'}`} value={progress} />
        </Box>
    );
}
