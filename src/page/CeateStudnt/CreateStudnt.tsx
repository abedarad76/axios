import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    button: {
        color:"red",
        backgroundColor:"red"
    }
})

export function CreateStudent() {

    const classes = useStyles();


    const [fornData, setfornData] = useState({
        farstname: "",
        lastName: "",
        age: 0,
        year: 0,
    })

    async function submit() {
        await fetch("", {
            method: "POST",
            body: JSON.stringify(fornData)
        })
    }


    return <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 120,
    }}

  
    >

        <Grid container spacing={1} style={{ width: 500 , backgroundColor:'red'}}>

            <Grid item xs={12}>
                <Typography variant="h5">
                    Create student form
                </Typography>
            </Grid>
            <Grid item xs={12}><TextField fullWidth label="Farst name" onChange={(event) => setfornData((data) => { return { ...data, farstname: event.target.value } })} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="last name" onChange={(event) => setfornData((data) => { return { ...data, lastName: event.target.value } })} /></Grid>
            <Grid item xs={12}><TextField type="number" fullWidth label="age" onChange={(event) => { setfornData((data) => { return { ...data, age: Number(event.target.value) } }) }} /></Grid>
            <Grid item xs={12}><TextField type="number" fullWidth label="Year" onChange={(event) => { setfornData((data) => { return { ...data, year: Number(event.target.value) } }) }} /></Grid>
            <Grid item >
                <Button variant="contained" onClick={() => submit}> submit</Button>
            </Grid>
        </Grid>

        <Button
            variant="contained"
            // color="warning"
            size="small"
            startIcon={<AccessibilityNewIcon />}
            className={classes.button}
        >Amir</Button>

    </Box>
}