import React, { Fragment, useEffect } from 'react'
import { Loader } from '../layout/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { Mouse } from '@mui/icons-material'
import { ProductCard } from './ProductCard'
import { MetaData } from '../layout/MetaData'
import './Home.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { clearErrors } from '../../featured/slices/userSlices'
import { getAllProducts } from '../../featured/actions/productActions'

export const Home = () => {

    const dispatch = useDispatch()


    const { error, products, loading } = useSelector(state => state.products)

    const { error: userError, user } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert(error)
            dispatch(clearErrors())
        }
        dispatch(getAllProducts())

        if (userError && !user) {
            alert("PLease login to access all resources")
        }

        // eslint-disable-next-line
    }, [dispatch, error, userError]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {
                        userError || user === null ?
                            <Link to='/login'>
                                <Button
                                    variant="contained"
                                    color='primary'
                                    style={{ position: "fixed", top: "2%", right: "2%", zIndex: '20' }}
                                >
                                    LogIn
                                </Button>
                            </Link> :
                            ""
                    }
                    <MetaData title='ECOMMERCE' />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <Mouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
