import {PaginationHelper} from "./PaginationHelper";

test("test pagination  for 3 elements per page for 3 items", () => {
        //create array with elements
        let InItems: Array<any> = [];
        for (let i = 1; i < 4; i++) {
            InItems.push({"id": i, "value": i})
        }

        console.log("in item array: " + JSON.stringify(InItems));
        console.log("in item array size: " + InItems.length);

        let helper = new PaginationHelper(3, InItems);


        console.log(" test get total page:" + helper.calculatePages());
        console.log(" paginated Items array page:" + JSON.stringify(helper.getPaginatedArray()));
        expect(helper.calculatePages()).toBe(1);

    }
)
