### 1.duck文件构成

```js
// 1.导入的东西
import { reduceFromPayload, createToPayload, DuckMap } from 'saga-duck';

// 2.TS接口类型相关

// get quickTypes，在该duck中使用的Type，本身+继承
get quickTypes() {
	return {
    ...super.quickTypes,
    ...Types,
  }
}

// get reducers，该duck使用的state，继承+本身
get reducers() {
    const { types } = this;
    return {
      ...super.reducers,
      visible: reduceFromPayload<boolean>(types.SET_VISIBLE, true),
      name: reduceFromPayload<string>(types.SET_NAME, ''),
    };
}

// creators，在业务组件中调用的方法，通过该方法派发action
get creators() {
  const { types } = this;
  return {
    ...super.creators,
    setVisible: createToPayload<boolean>(types.SET_VISIBLE),
    setName: createToPayload<string>(types.SET_NAME),
  };
}

// rawSelectors类似于计算属性，传入state，获取计算想要的值
get rawSelectors() {
  type State = this['State'];
  return {
    ...super.rawSelectors,
    sceneDetail: (state: State): ISceneDetail => SCENE_DETAIL_MAP[state.scene],
  };
}

// 监听相关
*watchToValidate() {
  const { types, selector, watchToValidateTypes } = this;
  yield takeLatest(watchToValidateTypes, function* () {
    const { score, otherReason, moreInfo } = selector(yield select());
    const disabled =
      score === null || otherReason.length > MAX_FEEDBACK_TEXT_LENGTH || moreInfo.length > MAX_FEEDBACK_TEXT_LENGTH;
    yield put({
      type: types.SET_DISABLED,
      payload: disabled,
    });
  });
}
// 获取数据相关

// 路由相关 getRouteParams

// *saga() 里面调用 submit，监听相关
```

