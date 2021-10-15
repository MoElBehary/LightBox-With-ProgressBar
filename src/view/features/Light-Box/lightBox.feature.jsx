import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LinearWithValueLabel from '../Progress-Bar/progressBar.featurer'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    const [completed, setCompleted] = React.useState(false) // task state
    React.useEffect(() => { handleClickOpen()},[])
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open LightBox
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Progress
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <LinearWithValueLabel isComplated={setCompleted}/>
                    <span style={{margin: '8px 0' }} className='CT-flex-center'>
                        {completed ?
                            <>
                                This Task Is 100% Completed
                                <i style={{ backgroundImage: "url(/icons/done.svg)", margin: '0 8px' }} className="iCT-sA uCT-img-contain"></i>
                            </>
                        : 
                            <span className='iCT-sA CT-flex-center'>Progrress</span>
                        }
                    </span> 
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
