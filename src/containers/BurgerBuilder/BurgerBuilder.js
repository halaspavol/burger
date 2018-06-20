import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from './../../axios-orders'
import Spinner from './../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.2,
    meat: 1,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 2,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurschaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0)

        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddintion = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice + priceAddintion
   
        this.setState({ingredients: updatedIngredients, totalPrice: parseFloat( newPrice.toFixed(2) ) })

        this.updatePurschaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return
        }
        const updatedCount = this.state.ingredients[type] - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice - priceDeduction

        this.setState({ ingredients: updatedIngredients, totalPrice: parseFloat(newPrice.toFixed(2)) })
        this.updatePurschaseState(updatedIngredients)
        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false})
    }
    
    purchaseContinue = () => {

        this.setState({loading: true})

        const order = {
            price: this.state.totalPrice,
            ingredients: this.state.ingredients,
            customer: {
                name: 'Pavol Halás', 
                address: {
                    street: 'Test5106',
                    city: 'Test',
                    zipCode: '24152',
                    country: 'Slovakia'
                },
                email: 'test@test.com'
            },
            deliverymethod: 'fastest'

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            }).catch(err => {
                this.setState({ loading: false, purchasing: false })
            })
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary
            price={this.state.totalPrice.toFixed(2)}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancleHandler}
            purchaseContinue={this.purchaseContinue}
        />

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    closed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />   
            </Aux>
        );
    }
}

export default BurgerBuilder;