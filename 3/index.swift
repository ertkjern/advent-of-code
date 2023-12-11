//
//  Started on swift but I think I'm going to switch to javascript.
 // To unfamiliar with swift to be able to solve this quickly.
//

import Foundation


class Point {
    var number: Int
    var length: Int
    var startIndex: Int
    
    init(number: Int, length: Int, startIndex: Int) {
        self.number = number
        self.length = length
        self.startIndex = startIndex
    }
}

func getPointCoordinates(lines: Array<Substring>) -> [Point] {
    var allNumbersAndCoordinates = [Point]()
    for (_, line) in lines.enumerated() {
        // each line should be split into a list of points
        let points = line.split(separator: "")
        var sequence: [Int] = []
        var startIndex = -1;
        for (index, point) in points.enumerated() {
            if(Int(point) != nil){
                if(sequence.count == 0){
                    startIndex = index
                }
                sequence.append(Int(point) ?? 0)
            }
            if(Int(point) == nil){
                if(sequence.count > 0){
                    let combined = sequence.map { String($0) }.joined()
                    allNumbersAndCoordinates.append(Point(number: Int(combined) ?? 0, length: sequence.count, startIndex: startIndex))
                }
                sequence = [];
            }
         }
    }
    return allNumbersAndCoordinates
}

func solve() -> Bool {
    let filename = "test.txt"
    let doubleArray = [[String]];
    do {
        var allNumbersAndCoordinates = [Point]()
        let contents = try String(contentsOfFile: filename)
        let lines = contents.split(separator:"\n")
        for (_, line) in lines.enumerated() {
            let points = line.split(separator: "")
            doubleArray.append(points)
        }
        allNumbersAndCoordinates = getPointCoordinates(lines: lines)
        print(allNumbersAndCoordinates[1].number)
        print(doubleArray[1][1])
    }
    catch {
        return false
    }
    return true;
}

print(solve())