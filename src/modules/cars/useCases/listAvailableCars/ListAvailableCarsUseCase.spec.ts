import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 01",
      description: "Car description",
      daily_rate: 150.4,
      license_plate: "DEF-123",
      fine_amount: 100,
      brand: "Audi",
      category_id: "category_id",
    });
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car_name_01",
      description: "Car description",
      daily_rate: 150.4,
      license_plate: "DEF-123",
      fine_amount: 100,
      brand: "Audi",
      category_id: "category_id",
    });
    const cars = await listCarsUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car_name_01",
      description: "Car description",
      daily_rate: 150.4,
      license_plate: "DEF-123",
      fine_amount: 100,
      brand: "Audi",
      category_id: "category_id",
    });
    const cars = await listCarsUseCase.execute({
      name: car.brand,
    });
    expect(cars).toEqual([car]);
  });
});
