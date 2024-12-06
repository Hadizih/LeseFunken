import pyphen

testtext = "Ich bin ein kleiner dicker Tanzbär, der gerne tanzt und singt auf dem Donaudampfschiffahrtsgesellschaftskapitänenball."

def transform_text_to_syllables(text:str) -> str:
    dic = pyphen.Pyphen(lang='de_DE')
    syllable_words = [dic.inserted(word).replace("-", " ") for word in text.split()]
    syllable_text_pretty = " ".join(syllable_words)

    return syllable_text_pretty

if __name__ == '__main__':
    print(testtext)
    print(transform_text_to_syllables(testtext))
