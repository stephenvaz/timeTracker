package models

import "gorm.io/gorm"

type User struct {
	UID      uint   `gorm:"PRIMARY_KEY;AUTO_INCREMENT" json:"uid"`
	Name     string `gorm:"NOT NULL" json:"name"`
	Email    string `gorm:"UNIQUE;NOT NULL" json:"email"`
	Password string `gorm:"NOT NULL" json:"password"`
}

func MigrateUsers(db *gorm.DB) error {
	err := db.AutoMigrate(&User{})
	return err
}
