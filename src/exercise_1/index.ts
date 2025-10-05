type User = {
    name: string;
    birthDate: string | Date;
    phone: string| number;
    optionalValue?: string | number | null;
}

function printUserInfo({ name, birthDate, phone, optionalValue }: User): void {
    console.log("------ Інформація про користувача ------");
    console.log(`Ім’я: ${name}`);
    console.log(`Дата народження: ${birthDate ?? "не вказано"}`);
    console.log(`Телефон: ${phone ?? "не вказано"}`);
    console.log(`Додаткове значення: ${optionalValue ?? "немає"}`);
    console.log("----------------------------------------");
}

printUserInfo({ name: "Марк", birthDate: "1995-05-13", phone:"+380507777777", optionalValue: 'Покращує навички ts' });