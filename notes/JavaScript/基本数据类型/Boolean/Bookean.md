## 布尔类型 

> 只有两个值：true / false     

### 2.1 如何把其它数据类型转换为布尔类型?  

- Boolean  

- !  

- !!

  ​    

  ```javascript  
  Boolean(1) =>true   
  !'BigSpinach' =>先把其它数据类型转换为布尔类型，然后取反    
  !!null =>去两次反，等价于没取反，也就剩下转换为布尔类型了  
  ```

  规律：**在JS中只有“0/NaN/空字符串/null/undefined”这五个值转换为布尔类型的false，其余都转换为true`**

