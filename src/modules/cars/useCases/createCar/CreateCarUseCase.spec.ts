import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car test",
      description: "some description",
      daily_rate: 110,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existent license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 01",
        description: "some description",
        daily_rate: 110,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      });

      await createCarUseCase.execute({
        name: "Car 02",
        description: "some description",
        daily_rate: 110,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 01",
      description: "some description",
      daily_rate: 110,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car.available).toBe(true);
  });
});
