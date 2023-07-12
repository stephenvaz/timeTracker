package controllers

import (

	"github.com/gofiber/fiber/v2"
	"github.com/stephen/models"
	"github.com/stephen/storage"
)

func GetHierarchy(c *fiber.Ctx) error {
	type HierarchyResponse struct {
		models.Hierarchy
		Ename   string
		Sname string
	}

	var hierarchyResponse []HierarchyResponse
	err := storage.DB.Db.
		Raw(`SELECT h.*, e.name AS Ename, s.name AS Sname
			FROM hierarchies h 
			JOIN users e ON h.employee_id = e.uid 
			JOIN users s ON h.supervisor_id = s.uid;`).
		Scan(&hierarchyResponse).
		Error

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(
			&fiber.Map{"message": "hierarchy not found"})
		return err
	}

	// Log the hierarchy response
	// for _, response := range hierarchyResponse {
	// 	log.Printf("HierarchyID: %d, EmployeeID: %d, SupervisorID: %d, EmployeeName: %s, SupervisorName: %s",
	// 		response.HierarchyID, response.EmployeeID, response.SupervisorID, response.employeename, response.supervisorname)
	// }
	// log.Print(hierarchyResponse)

	c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"data":    hierarchyResponse,
		"message": "hierarchy found",
	})
	return nil
}
