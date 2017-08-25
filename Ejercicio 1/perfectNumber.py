# Rafael Angel Segura Giraldo
# 25-8-2017

result = {}

def main():
    number_list = input("Enter a list of numbers: ")

    if isinstance(number_list, tuple) or isinstance(number_list, list):
        for i in range(len(number_list)):
            calculatetype(number_list[i])
    elif isinstance(number_list, int):
        calculatetype(number_list)

    print result


# Function to calculate the sum of its proper positive divisors and set number type
def calculatetype(y):
    x = 0

    for i in range(y):
        if i and not y % i:
            x += i
    if x == y:
        result[y] = 'Perfect'
    elif x > y:
        result[y] = 'Abundant'
    elif x < y:
        result[y] = 'Deficient'

main()
