import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, styled, Typography } from "@mui/material";
import Image from 'next/image';

import team1 from "assets/png-transparent-happy-man-man-smile-praise.png";
import team2 from "assets/team2.png";


const Header2 = () => {
   const [currentTeam, setCurrentTeam] = useState(team1); // Inicialmente, mostrar team1

    useEffect(() => {
        // Configura un intervalo para cambiar la imagen cada 5 segundos
        const interval = setInterval(() => {
          setCurrentTeam((prevTeam) => (prevTeam === team1 ? team2 : team1));
        }, 5000);
    
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
      }, []);
    
 /**/
    const CustomBox = styled(Box) (({ theme }) => ({
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        // tamaños
        gap: theme.spacing(2),
        paddingTop: theme.spacing(10),
        // color de fondo
        backgroundColor: 'skyblue',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }
    }));

    const BoxText = styled(Box) (({ theme }) => ({
        flex: '1',
        paddingLeft: theme.spacing(7),
        [theme.breakpoints.down('md')]: {
            flex: '2',
            textAlign: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    }));


  return  (
        <CustomBox component='header'>
            {/*  Box text  */}
            <BoxText 
            component='section'
            >
                <Typography
                variant='h2'
                component= 'h1'
                sx={{
                    fontWeight: 800,
                    color: '#fff',
                }}
                >
                   MANDE
                </Typography>

                <Typography
                variant='p'
                component='p'
                sx={{
                    py: 3,
                    lineHeight: 1.9,
                    color: '#fff',
                }}
                >
                    "Mande: Haciendo el trabajo por ti, para que puedas disfrutar de lo más importante."
                </Typography>

                <Box>
                    <Button 
                    variant='contained'
                    sx={{
                        mr: 2,
                        px: 4, 
                        py: 1,
                        fontSize: '1rem',
                        textTransform: 'capitalize',
                        borderRadius: 0,
                        borderColor: '#14192d',
                        color: '#fff',
                        backgroundColor: '#14192d',
                        "&&:hover": {
                            backgroundColor: "#343a55"
                        },
                        "&&:focus": {
                            backgroundColor: "#343a55"
                        }
                    }}
                    >
                        lOGIN
                    </Button>
                    <Button 
                   
                    variant='outlined'
                    sx={{
                        px: 4, 
                        py: 1,
                        fontSize:'0.9rem',
                        textTransform: 'capitalize',
                        borderRadius: 0,
                        color: '#fff',
                        backgroundColor: 'transparent',
                        borderColor: '#fff',
                        "&&:hover": {
                            color: '#343a55',
                            borderColor: '#343a55',
                        },
                        "&&:focus": {
                            color: '#343a55',
                            borderColor: '#343a55',
                        }
                    }}
                    >
                        explore
                    </Button>
                </Box>
            </BoxText>

            <Box sx={theme => ({
                [theme.breakpoints.down('md')]:{
                    flex: '1',
                    paddingTop: '30px',
                    alignSelf: 'center',
                },
                [theme.breakpoints.up('md')]:{
                    flex: '2',
                    alignSelf: 'flex-end',
                },
            })}
            >
             <Image
            src={currentTeam}
            alt=""
            style={{ 
                width: "150%", 
                marginBottom: 0,
            }}
          /> { /* */}
          
              
            </Box>

        </CustomBox>
    )
}

export default Header2