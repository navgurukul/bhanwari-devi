import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    cardDrop:{
        margin:"20px",
        minWidth:"352px"
    },
    cardContent:{
        height:"145px"
    },
    cardChip:{
        height:"10px",
        margin:"12px 0px",
        borderRadius:"10px",
    },
    cardImg:{
        display:"flex",
        
    },
    dropbatchDiv:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginTop:"22vh"
    },
    
}));
export default useStyles;
