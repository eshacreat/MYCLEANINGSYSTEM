const SENTIMENT_MODEL = {
    "intercept": 0.06608186620250756,
    "vocabulary": {
        "bathroom": {
            "index": 6,
            "idf": 3.8436627599305573,
            "coefficient": 0.052849214328848454
        },
        "barely": {
            "index": 4,
            "idf": 4.4678170690035515,
            "coefficient": -1.466601491636007
        },
        "touched": {
            "index": 103,
            "idf": 4.4678170690035515,
            "coefficient": -1.466601491636007
        },
        "unacceptable": {
            "index": 107,
            "idf": 4.4678170690035515,
            "coefficient": -1.466601491636007
        },
        "horrible": {
            "index": 44,
            "idf": 4.69096062031776,
            "coefficient": -0.7687053609056026
        },
        "service": {
            "index": 84,
            "idf": 2.769148022841508,
            "coefficient": -0.134334563839497
        },
        "arrived": {
            "index": 2,
            "idf": 3.512305623976115,
            "coefficient": -0.1286526498021259
        },
        "late": {
            "index": 53,
            "idf": 3.9569914452375605,
            "coefficient": -1.4234468387370092
        },
        "did": {
            "index": 24,
            "idf": 2.6650077635889113,
            "coefficient": -1.8044295212624748
        },
        "terrible": {
            "index": 97,
            "idf": 3.3257196683957027,
            "coefficient": -2.698143132785583
        },
        "job": {
            "index": 51,
            "idf": 2.6540786930567206,
            "coefficient": -0.23498091964662907
        },
        "worth": {
            "index": 119,
            "idf": 3.8436627599305573,
            "coefficient": -0.46339878196885753
        },
        "price": {
            "index": 70,
            "idf": 3.880030404101432,
            "coefficient": -0.526556065844941
        },
        "underwhelming": {
            "index": 109,
            "idf": 4.40327854786598,
            "coefficient": -1.8534989758537963
        },
        "cleaning": {
            "index": 16,
            "idf": 2.308332819650179,
            "coefficient": -0.49442600631215544
        },
        "quality": {
            "index": 73,
            "idf": 3.4622952034014536,
            "coefficient": -1.1818980155941359
        },
        "house": {
            "index": 46,
            "idf": 3.917770732084279,
            "coefficient": 0.054497475767747744
        },
        "dirty": {
            "index": 26,
            "idf": 4.040373054176611,
            "coefficient": -2.3289433390555723
        },
        "left": {
            "index": 54,
            "idf": 3.0649934059324497,
            "coefficient": -1.9559352735602618
        },
        "disappointed": {
            "index": 27,
            "idf": 4.69096062031776,
            "coefficient": -1.0267690578884148
        },
        "thorough": {
            "index": 99,
            "idf": 4.69096062031776,
            "coefficient": 1.3379879427997277
        },
        "work": {
            "index": 117,
            "idf": 3.9569914452375605,
            "coefficient": 1.7292103504422993
        },
        "reasonable": {
            "index": 74,
            "idf": 4.69096062031776,
            "coefficient": 1.3379879427997277
        },
        "clean": {
            "index": 13,
            "idf": 3.3257196683957027,
            "coefficient": 2.175811072388774
        },
        "carpets": {
            "index": 11,
            "idf": 4.084824816747446,
            "coefficient": -0.3178783403703618
        },
        "properly": {
            "index": 72,
            "idf": 4.69096062031776,
            "coefficient": -1.6771845978681197
        },
        "kitchen": {
            "index": 52,
            "idf": 3.997813439757816,
            "coefficient": 0.792434252876917
        },
        "shines": {
            "index": 85,
            "idf": 4.77797199730739,
            "coefficient": 2.540540826012256
        },
        "extremely": {
            "index": 34,
            "idf": 3.9569914452375605,
            "coefficient": 0.3012923437148882
        },
        "slow": {
            "index": 88,
            "idf": 4.610917912644224,
            "coefficient": -1.0339179991502665
        },
        "took": {
            "index": 102,
            "idf": 4.610917912644224,
            "coefficient": -1.0339179991502665
        },
        "hours": {
            "index": 45,
            "idf": 3.917770732084279,
            "coefficient": -1.6458266877686065
        },
        "tiny": {
            "index": 101,
            "idf": 4.610917912644224,
            "coefficient": -1.0339179991502665
        },
        "apartment": {
            "index": 1,
            "idf": 4.610917912644224,
            "coefficient": -1.0339179991502665
        },
        "waste": {
            "index": 112,
            "idf": 4.77797199730739,
            "coefficient": -0.8887976965733532
        },
        "money": {
            "index": 60,
            "idf": 4.77797199730739,
            "coefficient": -0.8887976965733532
        },
        "sloppy": {
            "index": 87,
            "idf": 3.9569914452375605,
            "coefficient": -1.9634238320045252
        },
        "staff": {
            "index": 92,
            "idf": 3.808571440119287,
            "coefficient": 0.04924195642281441
        },
        "rude": {
            "index": 82,
            "idf": 4.4678170690035515,
            "coefficient": -1.3857882272108002
        },
        "way": {
            "index": 113,
            "idf": 4.536809940490503,
            "coefficient": -1.0900410090645507
        },
        "expensive": {
            "index": 32,
            "idf": 4.536809940490503,
            "coefficient": -1.0900410090645507
        },
        "poor": {
            "index": 69,
            "idf": 3.9569914452375605,
            "coefficient": -1.6383467500066486
        },
        "ignored": {
            "index": 48,
            "idf": 4.536809940490503,
            "coefficient": -1.3303951180903022
        },
        "instructions": {
            "index": 50,
            "idf": 4.536809940490503,
            "coefficient": -1.3303951180903022
        },
        "completely": {
            "index": 20,
            "idf": 4.536809940490503,
            "coefficient": -1.3303951180903022
        },
        "worst": {
            "index": 118,
            "idf": 4.536809940490503,
            "coefficient": -1.3392743146786725
        },
        "unprofessional": {
            "index": 110,
            "idf": 4.536809940490503,
            "coefficient": -1.3392743146786725
        },
        "behavior": {
            "index": 7,
            "idf": 4.536809940490503,
            "coefficient": -1.3392743146786725
        },
        "experience": {
            "index": 33,
            "idf": 3.880030404101432,
            "coefficient": 0.14712661341328626
        },
        "notice": {
            "index": 62,
            "idf": 4.536809940490503,
            "coefficient": -0.8885799314115022
        },
        "wonderful": {
            "index": 116,
            "idf": 3.5382811103793754,
            "coefficient": 2.355532442711382
        },
        "friendly": {
            "index": 38,
            "idf": 3.9569914452375605,
            "coefficient": 1.9548866977520396
        },
        "outstanding": {
            "index": 64,
            "idf": 4.69096062031776,
            "coefficient": 1.314287350695291
        },
        "smells": {
            "index": 89,
            "idf": 3.9569914452375605,
            "coefficient": -0.15743489154978743
        },
        "fresh": {
            "index": 37,
            "idf": 4.536809940490503,
            "coefficient": 0.6885717492834732
        },
        "look": {
            "index": 57,
            "idf": 4.77797199730739,
            "coefficient": 1.3364756562544893
        },
        "brand": {
            "index": 9,
            "idf": 4.77797199730739,
            "coefficient": 1.3364756562544893
        },
        "new": {
            "index": 61,
            "idf": 4.77797199730739,
            "coefficient": 1.3364756562544893
        },
        "cleaned": {
            "index": 14,
            "idf": 4.131344832382338,
            "coefficient": 2.3283721365369967
        },
        "office": {
            "index": 63,
            "idf": 4.77797199730739,
            "coefficient": 0.7771496562705719
        },
        "perfectly": {
            "index": 68,
            "idf": 4.77797199730739,
            "coefficient": 0.7771496562705719
        },
        "satisfied": {
            "index": 83,
            "idf": 4.77797199730739,
            "coefficient": 0.7771496562705719
        },
        "customer": {
            "index": 21,
            "idf": 3.6495067454896,
            "coefficient": 0.747047447558231
        },
        "spots": {
            "index": 91,
            "idf": 3.997813439757816,
            "coefficient": -0.5318506846252773
        },
        "didnt": {
            "index": 25,
            "idf": 4.77797199730739,
            "coefficient": 0.957826564031897
        },
        "professional": {
            "index": 71,
            "idf": 4.4678170690035515,
            "coefficient": 1.4435537324339573
        },
        "right": {
            "index": 80,
            "idf": 4.4678170690035515,
            "coefficient": 1.4435537324339573
        },
        "time": {
            "index": 100,
            "idf": 4.4678170690035515,
            "coefficient": 1.4435537324339573
        },
        "weird": {
            "index": 114,
            "idf": 4.69096062031776,
            "coefficient": -0.8986048467415252
        },
        "like": {
            "index": 55,
            "idf": 4.69096062031776,
            "coefficient": -0.8986048467415252
        },
        "chemicals": {
            "index": 12,
            "idf": 4.69096062031776,
            "coefficient": -0.8986048467415252
        },
        "sparkling": {
            "index": 90,
            "idf": 4.536809940490503,
            "coefficient": 1.5516288086334271
        },
        "thank": {
            "index": 98,
            "idf": 3.8436627599305573,
            "coefficient": 2.2093434077775065
        },
        "happy": {
            "index": 41,
            "idf": 4.610917912644224,
            "coefficient": 1.3850014633941812
        },
        "result": {
            "index": 79,
            "idf": 4.610917912644224,
            "coefficient": 1.3850014633941812
        },
        "penny": {
            "index": 67,
            "idf": 4.610917912644224,
            "coefficient": 1.3850014633941812
        },
        "paid": {
            "index": 66,
            "idf": 4.536809940490503,
            "coefficient": -1.1636302657598556
        },
        "deep": {
            "index": 23,
            "idf": 3.997813439757816,
            "coefficient": -0.1841086234084433
        },
        "got": {
            "index": 39,
            "idf": 4.536809940490503,
            "coefficient": -1.1636302657598556
        },
        "basic": {
            "index": 5,
            "idf": 4.536809940490503,
            "coefficient": -1.1636302657598556
        },
        "wipe": {
            "index": 115,
            "idf": 4.536809940490503,
            "coefficient": -1.1636302657598556
        },
        "best": {
            "index": 8,
            "idf": 4.4678170690035515,
            "coefficient": 0.9496649600379483
        },
        "company": {
            "index": 18,
            "idf": 4.4678170690035515,
            "coefficient": 0.9496649600379483
        },
        "town": {
            "index": 104,
            "idf": 4.4678170690035515,
            "coefficient": 0.9496649600379483
        },
        "highly": {
            "index": 43,
            "idf": 3.5649493574615367,
            "coefficient": 2.3481689173080005
        },
        "recommend": {
            "index": 75,
            "idf": 4.4678170690035515,
            "coefficient": 0.9496649600379483
        },
        "breezed": {
            "index": 10,
            "idf": 4.77797199730739,
            "coefficient": 1.005448322369824
        },
        "skilled": {
            "index": 86,
            "idf": 4.77797199730739,
            "coefficient": 1.005448322369824
        },
        "team": {
            "index": 96,
            "idf": 4.77797199730739,
            "coefficient": 1.005448322369824
        },
        "reliable": {
            "index": 77,
            "idf": 4.536809940490503,
            "coefficient": 1.430608872613779
        },
        "trustworthy": {
            "index": 106,
            "idf": 4.536809940490503,
            "coefficient": 1.430608872613779
        },
        "efficient": {
            "index": 29,
            "idf": 4.536809940490503,
            "coefficient": 1.430608872613779
        },
        "looks": {
            "index": 58,
            "idf": 4.4678170690035515,
            "coefficient": 1.0400756464152583
        },
        "absolutely": {
            "index": 0,
            "idf": 4.4678170690035515,
            "coefficient": 1.0400756464152583
        },
        "stunning": {
            "index": 94,
            "idf": 4.4678170690035515,
            "coefficient": 1.0400756464152583
        },
        "standard": {
            "index": 93,
            "idf": 4.536809940490503,
            "coefficient": 1.0606109241425195
        },
        "exceeded": {
            "index": 30,
            "idf": 4.536809940490503,
            "coefficient": 1.0606109241425195
        },
        "expectations": {
            "index": 31,
            "idf": 4.536809940490503,
            "coefficient": 1.0606109241425195
        },
        "trash": {
            "index": 105,
            "idf": 4.536809940490503,
            "coefficient": -1.3152178029735035
        },
        "unbelievable": {
            "index": 108,
            "idf": 4.536809940490503,
            "coefficient": -1.3152178029735035
        },
        "great": {
            "index": 40,
            "idf": 4.610917912644224,
            "coefficient": 1.474753691749886
        },
        "support": {
            "index": 95,
            "idf": 4.610917912644224,
            "coefficient": 1.474753691749886
        },
        "high": {
            "index": 42,
            "idf": 4.610917912644224,
            "coefficient": 1.474753691749886
        },
        "missed": {
            "index": 59,
            "idf": 4.536809940490503,
            "coefficient": -1.5130377832686464
        },
        "living": {
            "index": 56,
            "idf": 4.536809940490503,
            "coefficient": -1.5130377832686464
        },
        "room": {
            "index": 81,
            "idf": 4.536809940490503,
            "coefficient": -1.5130377832686464
        },
        "impressed": {
            "index": 49,
            "idf": 4.610917912644224,
            "coefficient": 1.0867533915131757
        },
        "attention": {
            "index": 3,
            "idf": 4.610917912644224,
            "coefficient": 1.0867533915131757
        },
        "communication": {
            "index": 17,
            "idf": 4.69096062031776,
            "coefficient": -0.8151600659741078
        },
        "overall": {
            "index": 65,
            "idf": 4.69096062031776,
            "coefficient": -0.8151600659741078
        },
        "cleaners": {
            "index": 15,
            "idf": 3.6205192086163476,
            "coefficient": 0.966583124174072
        },
        "fast": {
            "index": 35,
            "idf": 4.040373054176611,
            "coefficient": 2.2092473135220927
        },
        "early": {
            "index": 28,
            "idf": 4.610917912644224,
            "coefficient": -1.290223740524793
        },
        "finish": {
            "index": 36,
            "idf": 4.610917912644224,
            "coefficient": -1.290223740524793
        },
        "hung": {
            "index": 47,
            "idf": 4.69096062031776,
            "coefficient": -1.3031203624414691
        },
        "complaint": {
            "index": 19,
            "idf": 4.69096062031776,
            "coefficient": -1.3031203624414691
        },
        "damaged": {
            "index": 22,
            "idf": 4.536809940490503,
            "coefficient": -1.1835227932834809
        },
        "vase": {
            "index": 111,
            "idf": 4.536809940490503,
            "coefficient": -1.1835227932834809
        },
        "refused": {
            "index": 76,
            "idf": 4.536809940490503,
            "coefficient": -1.1835227932834809
        },
        "responsibility": {
            "index": 78,
            "idf": 4.536809940490503,
            "coefficient": -1.1835227932834809
        }
    }
};
