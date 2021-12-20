# 概念

### [概念](https://www.tutorialspoint.com/design_pattern/decorator_pattern.htm)

* 装饰器模式允许用户在不改变现有对象结构的情况下向其添加新功能。这种类型的设计模式属于结构化模式，因为这种模式充当现有类的包装器。
  + 不改变现有对象结构
  + 添加新功能
* Decorator pattern allows a user to add new functionality to an existing object without altering its structure. This type of design pattern comes under structural pattern as this pattern acts as a wrapper to existing class.
* 创建一个装饰类包装原始类，其提供了一个增强功能，并对原函数签名协议没有修改
  + wraps the original class
  + 增强功能并不修改协议
* This pattern creates a decorator class which wraps the original class and provides additional functionality keeping class methods signature intact.

### Demo

* 提供 demo
* We are demonstrating the use of decorator pattern via following example in which we will decorate a shape with some color without alter shape class.

### Implementation

* We're going to create a Shape interface and concrete classes implementing the Shape interface. We will then create an abstract decorator class ShapeDecorator implementing the Shape interface and having Shape object as its instance variable.

* RedShapeDecorator is concrete class implementing ShapeDecorator.

* DecoratorPatternDemo, our demo class will use RedShapeDecorator to decorate Shape objects.

![An image](../../image/decorator.jpg)

1. 创建接口

```java
public interface Shape {
   void draw();
}
```

2. 实现

```java
public class Rectangle implements Shape {

   @Override
   public void draw() {
      System.out.println("Shape: Rectangle");
   }
}
```

3. 装饰者抽象类

```java
public abstract class ShapeDecorator implements Shape {
   protected Shape decoratedShape;

   public ShapeDecorator(Shape decoratedShape){
      this.decoratedShape = decoratedShape;
   }

   public void draw(){
      decoratedShape.draw();
   }
}
```

4. 真实实现

```java
public class RedShapeDecorator extends ShapeDecorator {

   public RedShapeDecorator(Shape decoratedShape) {
      super(decoratedShape);
   }

   @Override
   public void draw() {
      decoratedShape.draw();
      setRedBorder(decoratedShape);
   }

   private void setRedBorder(Shape decoratedShape){
      System.out.println("Border Color: Red");
   }
}
```

5. 测试代码

```java
public class DecoratorPatternDemo {
   public static void main(String[] args) {

      Shape circle = new Circle();

      Shape redCircle = new RedShapeDecorator(new Circle());

      Shape redRectangle = new RedShapeDecorator(new Rectangle());
      System.out.println("Circle with normal border");
      circle.draw();

      System.out.println("\nCircle of red border");
      redCircle.draw();

      System.out.println("\nRectangle of red border");
      redRectangle.draw();
   }
}
```

6. 输出结果

```java
Circle with normal border
Shape: Circle

Circle of red border
Shape: Circle
Border Color: Red

Rectangle of red border
Shape: Rectangle
Border Color: Red
```
