package models

import (
	"fmt"

	"gorm.io/gorm"
)

type Hierarchy struct {
	HierarchyID  uint `gorm:"primaryKey;autoIncrement"`
	EmployeeID   uint `gorm:"not null;foreignKey:EmployeeID;references:UID"`
	SupervisorID uint `gorm:"not null;foreignKey:SupervisorID;references:UID"`
}

func MigrateHierarchy(db *gorm.DB) error {

	err := db.AutoMigrate(&Hierarchy{})
	fmt.Println("Migrated Hierarchy")
	return err
}
