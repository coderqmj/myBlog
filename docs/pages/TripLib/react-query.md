## 文档地址

- [中文文档](https://cangsdarm.github.io/react-query-web-i18n/)
- [英文文档](https://react-query.tanstack.com/overview)

## 文档笔记

### 1.查询（useQuery）

- UseQueryOptions是react-query导入的类型
- options是自己想添加的配置信息，比如一些缓存时间等
- queryKey是判断是否使用缓存，

```typescript
// 封装的查询接口
export const useQueryModule = (data: IModule, options?: UseQueryOptions<any>) => 
	useQuery<IResult>({
    ...options,
    queryKey: ['xxx', data],
    queryFn: () => callApi({ Data: data }, 'DescribeXXX')
  })

// 业务组件使用
const { data, isLoading, refetch } = useQueryModule(
	{
    ...data
  },
  {
    ...options
  }
)
```

### 2.修改useMutation

```typescript
// 封装修改接口
export const useCreateModule = (options?:Omit<UseMutationOptions, 'mutationFn'>) =>
	useMutation<any, any, any>({
  	...options,
    mutationFn: (data) => callApi({ Data: data }, 'Addxxx')                            
	})
 
 // 业务调用
 const { mutate } = useCreateModule({
   onSuccess: 
   // 删除操作后可以进行重新获取的操作
   // 一些提示
 })
```

