import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

// items: {
//   "123": 4,
//   "abc": 22
// }

export interface CartState {
  items: { [productID: string]: number }
}

const initialState: CartState = {
  items: {}
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.items[id]) {
        state.items[id]++
      } else {
        state.items[id] = 1
      }
    }
  }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer

// Selector function
export function getNumItems(state: RootState) {
  console.log('Calling num items')
  let numItems = 0

  for (let id in state.cart.items) {
    numItems += state.cart.items[id];
  }

  return numItems
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    console.log('Calling getMemoizedNumItems')
    let numItems = 0

    for (let id in items) {
      numItems += items[id];
    }

    return numItems
  }
)

/*
createSelector was brought in to RTK from the popular reselect library. While it's not needed to create selector functions, it makes it a lot easier to create efficient selectors that avoid doing more work than needed.

createSelector takes two types of arguments. There are inputSelectors (and there can be more than one of these) and then there's the resultFunction. You pass in these input selectors and then the result function processes the data that gets returned. As long as the input values don't change, the generated selector won't re-run the result function.

If the data you're working with isn't large or the calculations aren't complex, you don't really need to use createSelector. But it's a good tool to have in your toolbox.
*/