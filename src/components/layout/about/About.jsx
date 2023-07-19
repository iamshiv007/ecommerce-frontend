import { GitHub, Instagram } from '@mui/icons-material'
import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import './About.css'
import Shiv from '../../../images/shiv1.jpg'

export const About = () => {
    const visitInstagram = () => {
        window.location = 'https//instagram.com/iam_shiv_726'
    }
  return (
    <div className='aboutSection'>
        <div></div>
        <div className="aboutSectionGradiant"></div>
        <div className="aboutSectionContainer">
            <Typography component='h1'>About Us</Typography>

        <div>
            <div>
                <Avatar
                src={Shiv}
                style={{ width:'10vmax', height:'10vmax', margin:'2vmax 0'}}
                alt='Founder'
                />
                <Typography>Shivraj Gurjar</Typography>
                <Button onClick={visitInstagram} color='primary' >Visit Instagram</Button>
                <span>
                    This is a demo Ecommerce Website made by @shivraj for
                    showing his Skills and programming understanding.
                </span>
            </div>

            <div className="aboutSectionContainer2">
                <Typography component="h2">Our Brands</Typography>
                <a 
                href="https://www.github.com/iamshiv007"
                target='_blank'
                rel="noreferrer"
                >
                    <GitHub style={{fontSize:'40px'}} className='gitHubSvgIcon' />
                </a>
                <a 
                href="https://www.instagram.com/iam_shiv_726"
                target='_blank'
                rel="noreferrer"
                >
                    <Instagram style={{fontSize:'40px'}} className='instagramSvgIcon' />
                </a>
            </div>
        </div>
        </div>
    </div>
  )
}
