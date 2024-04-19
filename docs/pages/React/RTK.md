### 一、认识Redux ToolKit

- Redux ToolKit是官方推荐的编写Redux逻辑的方法，目的是简化开发流程，减少样板代码，提高开发效率。本质上是对Redux进行了二次封装
- Redux ToolKit出现的背景以及解决了哪些问题：
  - 官方也意识到Redux的编写逻辑过于复杂和繁琐，对于刚接触Redux的开发者，学习和使用成本也比较高，维护起来也比较繁琐
  - 解决之前Redux配置复杂的问题，如中间件、reducer、combineReducers、action、type、createStore等等一些列的操作都要手动去配置
  - 通过RTK可以少安装许多Redux相关的依赖，RTK本身就已经支持thunk，immutablejs、Redux DevTools等
  - 代码还需要拆分在多个文件里（虽然也可以放到一个文件管理，代码量过多，不利于管理）
  - 精简Redux代码，避免出现大量重复代码
- Redux ToolKit官方简称为RTK
- RTK核心API
  - **configureStore**：包装createStore以提供精简化配置选项和良好的默认值。它可以自动组合你的slice reducer，添加你提供的任何Redux中间件，redux-thunk默认包含，并启用Redux DevTools Extension
  - **createSlice**: 接受reducer函数的对象、切片名称和初始状态值，并且自动生切片reducer，并带有相应的actions
  - **createAsyncThunk**：接受一个动作类型字符串和一个返回promise的函数，并生成一个pending/fullfilled/reject基于该承诺分派的动作类型的thunk

### 二、Redux ToolKit的使用

只需要安装两个依赖：`npm i react-redux @reduxjs/toolkit`

#### 2.1使用RTK创建一个Redux Store

- 只要传入对应Slice的reducer，它会帮我们做下列的操作：
  - 调用combineReducers合并传入的reducer
  - 默认帮我们添加常用的中间件，如：redux-thunk，Redux DevTools等中间件
  - 创建Store并返回
- 相较于以前，现在创建store只需要调用configureStore就能完成combineReducers、applyMiddleware、createStore等一些列操作

```typescript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice';
import regionReducer from '../features/region/regionSlice';
import deviceReducer from '../features/device/deviceSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // region: regionReducer,
    // device: deviceReducer,
  },
  // middleware: 也支持自定义middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;    


// 对比之前的创建store
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
```

#### 2.2通过RTK的createSlice去简化创建切片

- 需要传入用于标识的name，初始状态initialState，用于更新状态的reducers，selectors等
- createSlice会帮我们做如下操作：
  - 根据name和function自动生成type，并创建action，创建reducer，selectors等等

```typescript
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',  // 标识符
  initialState: {value: 0},  // 初始状态
  reducers: {  // 用于修改状态的reducers
    increment: (state, action) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // action.type = 'counter/incrementByAmount'
      state.value += action.payload;
    },
  },
   selectors: {
    doubleCount: (state) => state.value * 2
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
// Counter.tsx
dispatch(incrementByAmount(10))
dispatch(decrement())
const counter = useAppSelector(store => store.counter);
const doubleCount = counterSlice.selectors.doubleCount({ counter })
```

#### 2.3在业务中使用并修改状态

- 使用useSelector从store里面读取数据
- 使用useDispatch派发actions

```tsx
// App.tsx
import { store } from './store/store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Counter.tsx
import { useAppSelector, useAppDispatch } from '../../store';
import {decrement,increment,incrementByAmount, counterSlice} from './counterSlice';

export function Counter() {
  const counter = useAppSelector(store => store.counter);
  const { value: count } = counter;
  const dispatch = useAppDispatch();
  const doubleCount = counterSlice.selectors.doubleCount({ counter })

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>
          -
        </button>
        <span>{count}</span>
        <span>doubleCount{doubleCount}</span>
        <button onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div>
        <button
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}

```

#### 2.4异步逻辑与数据请求

- redux本身不支持异步逻辑，需要借助异步中间件来完成异步逻辑，如`redux-thunk`、`redux-saga`
- Redux官方更推荐使用redux-thunk，因为它可以满足大多数的场景用例，并且async/await在thunk中使用也易于阅读
- 并且RTK的configureStore默认支持了redux-thunk，无需自己手动配置
- 使用createAsyncThunk可以进行异步操作并修改数据

```typescript
import { createAsyncThunk, counterSlice } from '@reduxjs/toolkit';
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount', // 内部帮生成异步请求生命周期的类型，如counter/fetchCount/fulfilled
  async (amount: number, , { dispatch }) => {
    const response = await fetchCount(amount);
    // 1.可以在createAsyncThunk里面进行更新数据
    dispatch(incrementByAmount(response.data))
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {value: 0, status: 'idle'},
  reducers: { 
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
    // 2.可以在extraReducers里面进行过更新数据
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const { incrementByAmount } = counterSlice.actions;

// Counter.tsx
dispatch(incrementAsync(123))
```

#### 三、源码阅读

#### configureStore

- 1.合并所有的reducer 
- 2.加入中间件
- 3.创建store并返回

```typescript
export function configureStore(options) {
   const {
    reducer = undefined,
    middleware,
    devTools = true,
    preloadedState = undefined,
    enhancers = undefined,
  } = options || {}
   
  // 1.合并所有的reducer  
  if (typeof reducer === 'function') {
    rootReducer = reducer
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer)
  }
  // 2.加入中间件
  let finalMiddleware: Tuple<Middlewares<S>>
  if (typeof middleware === 'function') {
    finalMiddleware = middleware(getDefaultMiddleware)
  } else {
    finalMiddleware = getDefaultMiddleware()
  }
  let finalCompose = compose
  let storeEnhancers =
  typeof enhancers === 'function'
    ? enhancers(getDefaultEnhancers)
    : getDefaultEnhancers()
  const composedEnhancer = finalCompose(...storeEnhancers)
  
  // 3.创建store并返回
  return createStore(rootReducer, preloadedState as P, composedEnhancer)
}
```



#### createSlice

- 

```typescript
function createSlice(options) {
  const { name, reducerPath = name } = options
  const reducerNames = Object.keys(options.reducers)
  reducerNames.forEach((reducerName) => {
    const reducerDefinition = reducers[reducerName]
    const reducerDetails = {
      reducerName,
      type: `${name}/${reducerName}`,
    }
    // 1.创建actions
    handleNormalReducerDefinition<State>(
      reducerDetails,
      reducerDefinition,
      contextMethods,
    )
  })
  // 2.创建reducer
  function buildReducer() {
    const [
      extraReducers = {},
      actionMatchers = [],
      defaultCaseReducer = undefined,
    ] =
      typeof options.extraReducers === 'function'
        ? executeReducerBuilderCallback(options.extraReducers)
        : [options.extraReducers]

    const finalCaseReducers = {
      ...extraReducers,
      ...context.sliceCaseReducersByType,
    }

    return createReducer(options.initialState, (builder) => {
      for (let key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key] as CaseReducer<any>)
      }
      for (let sM of context.sliceMatchers) {
        builder.addMatcher(sM.matcher, sM.reducer)
      }
      for (let m of actionMatchers) {
        builder.addMatcher(m.matcher, m.reducer)
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer)
      }
    })
  }
  function reducer(state: State | undefined, action: UnknownAction) {
    if (!_reducer) _reducer = buildReducer()

    return _reducer(state, action)
  }
  // 3.返回slice
  return {
    name，
    reducer，
    actions: context.actionCreators as any,
    
  }
}
```

