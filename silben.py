import pyphen

testtext = "Ich bin ein kleiner dicker Tanzbär, der gerne tanzt und singt auf dem Donaudampfschiffahrtsgesellschaftskapitänenball."

def transform_text_to_syllables(text:str) -> str:
    dic = pyphen.Pyphen(lang='de_DE')
    syllable_text_raw = dic.inserted(text).replace("-", " ")
    syllable_text_pretty = syllable_text_raw.replace("  ", " ")

    return syllable_text_pretty

if __name__ == '__main__':
    print(transform_text_to_syllables(testtext))
