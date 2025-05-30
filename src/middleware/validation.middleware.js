export const createUserValidationSchema = {
    firstname : {
        isString: {
            errorMessage: "Must be a string"
        },
        notEmpty: {
            errorMessage: "not suppoosed to be empty"
        }
    },
    lastname : {
        isString: {
            errorMessage: "Must be a string"
        },
        notEmpty: {
            errorMessage: "not suppoosed to be empty"
        }
    },
    email: {
        notEmpty: {
            errorMessage: "Email is not supposed to be empty",
        },
        isEmail: {
            errorMessage: "Must be an email",
        }
    },
    addresses: [{
        street: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        city: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        state: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        zipcode: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        country: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        isdefault: {
            isBoolean:{
                errorMessage: "must be a boolean"
            }
        },

    }]

}

export const createProductValidationScheme = {
    name: {
        isString: {
            errorMessage: "Must be a string"
        },
        notEmpty: {
            errorMessge: "Required"
        }
    },
    description: {
        isString: {
            errorMessage: "Must be a string"
        },
        notEmpty: {
            errorMessge: "Required"
        }
    },
    price: {
        notEmpty: {
            errorMessge: "Required"
        }
    },
    category: {
        isString: {
            errorMessage: "Must be a string"
        },
        notEmpty: {
            errorMessge: "Required"
        }
    },

}

export const ratingsValSchema = {
    ratings: [{
        id: {
            isString: {
                errorMessage: "id is supposed to be a string"
            }
        },
         rating: {
            isString: {
                errorMessage: "supposed to be a string"
            }
        },
         review: {
            isString: {
                errorMessage: " supposed to be a string"
            }
        }
    }]
}

export const cartvalschema = {
    userid: {
        isString: {
            errorMessage: "Must be a string"
        }
    },
    item: [{
        productid: {
            isString: {
                errorMessage: "id is supposed to be a string"
            },
            notEmpty:{
                errorMessage: "required"
            }
        },
        quantity: {
            isString: {
                errorMessage: "supposed to be a string"
            },
            notEmpty:{
                errorMessage: "required"
            }
        },
        price: {
            isString: {
                errorMessage: "supposed to be a string"
            },
            notEmpty:{
                errorMessage: "required"
            }
        }
    }]
}

export const orderValSchema = {
     userid: {
        isString: {
            errorMessage: "Must be a string"
        }
     },
     shippingaddress: {
        street: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        city: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        state: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        zipcode: {
            isString:{
                errorMessage: "must be a string"
            }
        },
        country: {
            isString:{
                errorMessage: "must be a string"
            }
        }
     }

}
export const itemValSchema = {
    item: [{
        productid: {
            isString: {
                errorMessage: "id is supposed to be a string"
            },
            notEmpty:{
                errorMessage: "required"
            }
        },
        quantity: {
            isString: {
                errorMessage: "supposed to be a string"
            },
            notEmpty:{
                errorMessage: "required"
            }
        },
        price: {
            isString: {
                errorMessage: "supposed to be a string"
            },
            notEmpty:{
                errorMessage: "required"
            }
        }
    }]
}