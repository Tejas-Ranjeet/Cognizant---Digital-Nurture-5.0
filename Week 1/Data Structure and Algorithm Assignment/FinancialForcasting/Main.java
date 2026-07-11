
import java.util.Scanner;
//class FinancialForecast {
//
//    // Recursive method to calculate future value
//
//}
public class Main {
    public static double forecastValue(double currentValue, double rate, int years) {
        if (years == 0) return currentValue;
        return forecastValue(currentValue, rate, years - 1) * (1 + rate / 100);
    }
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println();
        // Taking user input
        System.out.print("Enter the initial investment value (Rs.): ");
        double initialValue = scanner.nextDouble();

        System.out.print("Enter the annual growth rate (%): ");
        double growthRate = scanner.nextDouble();

        System.out.print("Enter the number of years to forecast: ");
        int forecastYears = scanner.nextInt();

        // Call the recursive method
        double futureValue = forecastValue(initialValue, growthRate, forecastYears);

        System.out.println();
        // result
        System.out.printf("Future value after %d years: Rs. %.2f\n", forecastYears, futureValue);
        System.out.println();

        scanner.close();
    }
}
