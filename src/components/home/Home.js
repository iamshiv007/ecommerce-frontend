import React, { Fragment, useEffect } from 'react'
import { Loader } from '../layout/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { Mouse } from '@mui/icons-material'
import { ProductCard } from './ProductCard'
import { MetaData } from '../layout/MetaData'
import './Home.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { clearErrors } from '../../featured/slices/authSlice'
import { getAllProducts } from '../../featured/actions/productActions'

export const Home = () => {

    const dispatch = useDispatch()


    const { error, products, loading } = useSelector(state => state.products)

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {

        if (error) {
            alert(error)
            dispatch(clearErrors())
        }
        dispatch(getAllProducts())

        // eslint-disable-next-line
    }, [dispatch, isAuthenticated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {
                        !isAuthenticated ?
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
