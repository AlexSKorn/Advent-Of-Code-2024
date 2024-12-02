package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("Hello, World")

	leftNumbers, rightNumbers, err := readFile()
	if err != nil {
		fmt.Println("Error reading file: ", err)
	}

	total := 0

	for i := 0; i < len(leftNumbers); i++ {
		total += abs(leftNumbers[i] - rightNumbers[i])
	}
	fmt.Println("This is the total ", total)

}

func readFile() ([]int, []int, error) {
	var leftNumbers []int
	var rightNumbers []int

	file, err := os.Open("../input.txt")
	if err != nil {
		fmt.Println("Error opening file: ", err)
		return nil, nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		numbers := strings.Split(line, "   ")
		leftNum, err := strconv.Atoi(numbers[0])
		rightNum, err := strconv.Atoi(numbers[1])
		if err != nil {
			fmt.Println("Error parsing integers: ", err)
			return nil, nil, err
		}
		leftNumbers = append(leftNumbers, leftNum)
		rightNumbers = append(rightNumbers, rightNum)
	}
	sort.Ints(leftNumbers)
	sort.Ints(rightNumbers)

	return leftNumbers, rightNumbers, err
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
