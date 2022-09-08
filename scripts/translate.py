NAME_TRANSLATIONS = {
    "Siva Raman": "Sivaraman Venkatesan",
    "Deepika": "Deepika Shankar",
    "Monika": "Monika Shankar",
    "Pooja B": "Pooja Bapat",
    "Siva Kumar": "Sivakumar",
    "Kajal Jmp": "Kajal JMP",
    "Govind Jmp": "Govind JMP",
    "Vimanthan": "Vimanthan L",
    "Mrinalini Siddhartha": "Koka Mrinalini Siddhartha",
    "Gothainayagi": "Gothainayagi R",
    "Hariharan K": "Hariharan Kumar",
    "Harsha Vardhan": "Harsha GK",
    "Yuvaraj": "Yuvaraj Magesh",
    "Subhash": "Subash S",
    "Samyuktha": "Samyuktha Arvind",
    "Karan Sharam": "Karan Sharma",
    "Mirra": "Vijaya Dharshini M",
}


def translate_name(name):
    return NAME_TRANSLATIONS.get(name, name)


def translate_player_name(player):
    name = player["name"]
    if name in NAME_TRANSLATIONS:
        player["name"] = NAME_TRANSLATIONS[name]
    return player
