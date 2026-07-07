const ESTIMATOR_MODEL = {
    "features": [
        "square_footage_scaled",
        "num_rooms_scaled",
        "service_home",
        "service_office",
        "service_deep",
        "service_carpet",
        "dirt_light",
        "dirt_standard",
        "dirt_heavy"
    ],
    "scaler": {
        "square_footage": {
            "mean": 2744.7093333333332,
            "std": 1316.7438387348625
        },
        "num_rooms": {
            "mean": 5.424,
            "std": 1.8497452076795093
        }
    },
    "duration_model": {
        "coefficients": [
            1.7277857451091796,
            0.5787814326298562,
            0.03993307909131329,
            1.1917046442980908,
            2.1716494093457093,
            0.7332566649300373,
            0.48194899617908254,
            1.2731221984048524,
            2.381472603081213
        ],
        "intercept": 6.533041812340475
    },
    "price_model": {
        "coefficients": [
            76.3732542976432,
            13.5653811126164,
            -8.070967780678295,
            55.01748023769992,
            95.21614774332562,
            21.09526381711807,
            34.56638271347953,
            52.4199852992581,
            76.27155600472761
        ],
        "intercept": 257.8358478955306
    }
};
