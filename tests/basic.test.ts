import {expect,describe,test} from "vitest";

const add = (num1:number,num2:number) => num1 + num2;

describe("テストの書き方", () => {
    test("1 + 1 = 2",() => {
        expect(add(1,1)).toBe(2);
    })
})
